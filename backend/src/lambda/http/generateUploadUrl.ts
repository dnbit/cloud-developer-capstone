import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { updateAttachmentUrl } from '../../businessLogic/todos'
import { getPresignedUrl } from '../../businessLogic/storage'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('auth')

const image_bucket_name = process.env.IMAGES_S3_BUCKET;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info(`generateUploadUrl call received with event ${event}`)

  const todoId = event.pathParameters.todoId
  const AttachmentUrl: string = `https://${image_bucket_name}.s3.amazonaws.com/${todoId}`;
  
  await updateAttachmentUrl(todoId, getUserId(event), AttachmentUrl)

  const uploadUrl = await getPresignedUrl(todoId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      uploadUrl
    })
  }
}
