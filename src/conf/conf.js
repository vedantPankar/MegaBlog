const conf = {
    endpoint_url: String(import.meta.env.VITE_APPWRITE_ENDPOINT_URL),
    project_id:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    database_id:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    table_id:String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    bucket_id:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymce_api: String(import.meta.env.VITE_TINY_MCE_API),
}

export default conf