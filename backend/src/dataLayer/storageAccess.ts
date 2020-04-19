import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'

const logger = createLogger('auth')

const XAWS = AWSXRay.captureAWS(AWS);

export class StorageAccess {
    
    constructor(
        private readonly s3 = new XAWS.S3({ signatureVersion: 'v4'}),
        private readonly bucket = process.env.IMAGES_S3_BUCKET,
        private readonly expirationTime = process.env.PRESIGNED_URL_EXPIRE_TIME) {
    }

    getPresignedUrl(todoId: string): string {
        logger.info(`Creating presigned url for todoId ${todoId}`)
        return this.s3.getSignedUrl('putObject', {
            Bucket: this.bucket,
            Key: todoId,
            Expires: this.expirationTime
          }) as string
    }
}