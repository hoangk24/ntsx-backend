import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUD_NAME } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import cloudinary, { ConfigOptions, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

const config: ConfigOptions = {
  api_secret: CLOUDINARY_API_SECRET,
  api_key: CLOUDINARY_API_KEY,
  cloud_name: CLOUD_NAME,
};

export const ForderName = {
  POSTERS: 'posters',
  AVATAR: 'avatars',
  LOGO: 'logos',
  OTHER: 'others',
};

cloudinary.v2.config(config);

const cloudinaryUpload = {
  upload: async (path: string, forderName: string): Promise<{ public_id: string; url: string }> =>
    await cloudinary.v2.uploader.upload(
      path,
      { forder: forderName },
      (err: UploadApiErrorResponse, result: UploadApiResponse): { public_id: string; url: string } => {
        if (err) throw new HttpException(err.http_code, err.message);
        return { public_id: result.public_id, url: result.url };
      },
    ),
  remove: async (public_id: string): Promise<any> =>
    await cloudinary.v2.uploader.destroy(public_id, (err, result) => {
      if (err) throw new HttpException(400, 'Remove image failed');
      return result;
    }),
};

export default cloudinaryUpload;
