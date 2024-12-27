import { Injectable } from '@nestjs/common';
import { SupabaseServiceService } from 'src/common/services/supabase-service.service';
import { FileEntity } from 'src/Files/domain/entities/file-entity';
import {
  FileInterfaceRepository,
  IUrl,
} from 'src/Files/domain/interface/file-interface';

@Injectable()
export class FileInterfaceImpl implements FileInterfaceRepository {
  BUCKETS_NAME = ['user', 'resumes'];
  EXPIRE_YEARS = 525600 * 99;
  constructor(private supabaseService: SupabaseServiceService) {}

  async findOneFileById(userId: number): Promise<IUrl> {
    try {
      const { data: files, error } = await this.supabaseService
        .getClient()
        .storage.from('your_bucket_name')
        .list(String(userId), { limit: 100 });

      if (error) {
        throw new Error(`Error al listar los archivos: ${error.message}`);
      }

      if (!files || files.length === 0) {
        throw Error('No se encontraron archivos para este usuario.');
      }

      // Generar las URLs públicas para cada archivo
      const urls = files.map((file) => {
        const { data: publicUrl } = this.supabaseService
          .getClient()
          .storage.from('user')
          .getPublicUrl(`${userId}/${file.name}`);
        return publicUrl?.publicUrl;
      });

      console.log('URLs generadas:', urls);
      return { url: urls[0] };
    } catch (err) {
      console.error('Error en getFilesUrlsByUserId:', err);
      throw err;
    }
  }

  async postFile(file: any, bucketName: string, userId: number): Promise<IUrl> {
    try {
      const buffer = file.buffer;
      const mimetype = file.mimetype;
      const fileName = file.originalname;

      const blob = new Blob([buffer], { type: mimetype });
      const { data: uploadData, error: uploadError } =
        await this.supabaseService
          .getClient()
          .storage.from(bucketName)
          .upload(`${userId}/${fileName}`, blob, {
            cacheControl: '3600',
            upsert: true,
          });

      if (uploadError) {
        throw new Error(`Error al subir el archivo: ${uploadError.message}`);
      }

      const { data: publicUrlData } = await this.supabaseService
        .getClient()
        .storage.from(bucketName)
        .createSignedUrl(`${userId}/${fileName}`, this.EXPIRE_YEARS);

      const publicUrl = publicUrlData?.signedUrl;
      if (!publicUrl) {
        throw new Error('No se pudo generar la URL pública del archivo.');
      }

      const { error: updateError } = await this.supabaseService
        .getClient()
        .from('resumeUser')
        .update({ image: publicUrl })
        .eq('id', userId);

      if (updateError) {
        throw new Error(
          `Error al actualizar el usuario: ${updateError.message}`,
        );
      }

      return { url: publicUrl };
    } catch (err) {
      console.error('Error en postFile:', err);
      throw err;
    }
  }
}
