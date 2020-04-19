import { StorageAccess } from "../dataLayer/storageAccess";

const storageAccess = new StorageAccess()

export async function getPresignedUrl(todoId: string): Promise<string> {
    return storageAccess.getPresignedUrl(todoId)
}