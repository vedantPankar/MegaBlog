import { Client, ID, Query, Storage, TablesDB } from "appwrite";
import conf from "../conf/conf";

class AppwriteService {
    client = new Client()
    tableDB
    bucket

    constructor() {
        this.client.setEndpoint(conf.endpoint_url).setProject(conf.project_id)
        this.tableDB = new TablesDB(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, content, slug, featuredImage,  status, userId}) {
        try {
            const post = await this.tableDB.createRow(
                conf.database_id,
                conf.table_id,
                slug,
                {
                    title,
                    content,
                    featuredImage, 
                    slug,
                    status,
                    userId,
                }
            )
            return post
        } catch (error) {
            console.error(error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.tableDB.updateRow(
                conf.database_id,
                conf.table_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.error(error);
        }
    }

    async deletePost(slug) {
        try {
            await this.tableDB.deleteRow(
                conf.database_id,
                conf.table_id,
                slug
            )
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.tableDB.getRow(
                conf.database_id,
                conf.table_id,
                slug
            )
        } catch (error) {
            console.error(error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.tableDB.listRows(
                conf.database_id,
                conf.table_id,
                queries
                
            )
        } catch (error) {
            console.error(error);
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.bucket_id,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return this.bucket.deleteFile(
                conf.bucket_id,
                fileId,
            )
        } catch (error) {
            console.error(error);
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFileView(
                conf.bucket_id,
                fileId
            )
        } catch (error) {
            console.error(error);
            return false
        }
    }
}

const appwriteService = new AppwriteService()

export default appwriteService