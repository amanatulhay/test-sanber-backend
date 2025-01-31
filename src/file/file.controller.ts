import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from "fs";
import * as path from 'path';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

const port = process.env.PORT ?? 8080;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}/`;

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("upload-image")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "public/img",
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imagePath = file ? `${baseUrl}public/img/${file.filename}` : '';
    return {
      code: 200,
      file: imagePath,
    };
  }

  @Delete("delete-image")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageUrl: { 
          type: 'string',
          example: 'http://localhost:8080/public/img/testimage.jpg',
        },
      },
    },
  })
  async deleteFile(@Body("imageUrl") imageUrl: string) {
    try {
      const fullImagePath = path.join('public', 'img', path.basename(imageUrl));
      if (fs.existsSync(fullImagePath)) {
        fs.unlinkSync(fullImagePath);
        return { code: 200, message: "File deleted successfully" };
      } else {
        throw new HttpException("File not found", HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
