use std::fs;
use std::path::Path;
use rusqlite::{params, Connection, Result as SqlResult};
use thiserror::Error;
use serde::Serialize;
use serde_json::json;

#[derive(Debug, Serialize)]
struct FileMetadata {
    name: String,
    path: String,
    size: u64,
    extension: String,
}

// Define custom errors for better error handling
#[derive(Debug, Error)]
enum UploadError {
    #[error("File does not exist")]
    FileNotFound,
    #[error("File metadata error: {0}")]
    MetadataError(#[from] std::io::Error),
    #[error("Database connection error: {0}")]
    DbConnectionError(#[from] rusqlite::Error),
    #[error("Other error: {0}")]
    OtherError(String),
}

async fn upload_file(file_path: String) -> Result<FileMetadata, UploadError> {
    let path = Path::new(&file_path);

    if !path.exists() {
        return Err(UploadError::FileNotFound);
    }

    let metadata = fs::metadata(&file_path)?;
    let extension = path
        .extension()
        .and_then(|ext| ext.to_str())
        .unwrap_or("")
        .to_string();
    let name = path
        .file_name()
        .and_then(|name| name.to_str())
        .unwrap_or("")
        .to_string();

    let file_metadata = FileMetadata {
        name: name.clone(),
        path: file_path.clone(),
        size: metadata.len(),
        extension: extension.clone(),
    };

    // Here you can save the file metadata to the database if needed
    // Create a new Book record in the database
    let conn = Connection::open("file:../prisma/database.db")?;
    let result: SqlResult<usize> = conn.execute(
        "INSERT INTO Book (name, type, location, createdAt, updatedAt) VALUES (?1, ?2, ?3, datetime('now'), datetime('now'))",
        params![name, extension, file_path],
    );

    match result {
        Ok(_) => Ok(file_metadata),
        Err(e) => Err(UploadError::DbConnectionError(e)),
    }
}

#[derive(Serialize)]
struct ApiResponse {
    success: bool,
    data: Option<FileMetadata>,
    error: Option<String>,
}

// TODO: Testing Left
#[tauri::command]
async fn handle_upload(file_path: String) -> Result<String, String> {
    match upload_file(file_path).await {
        Ok(metadata) => {
            let response = ApiResponse {
                success: true,
                data: Some(metadata),
                error: None,
            };
            Ok(serde_json::to_string(&response).unwrap())
        },
        Err(e) => {
            let response = ApiResponse {
                success: false,
                data: None,
                error: Some(format!("Error uploading file: {}", e)),
            };
            Ok(serde_json::to_string(&response).unwrap())
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![handle_upload])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
