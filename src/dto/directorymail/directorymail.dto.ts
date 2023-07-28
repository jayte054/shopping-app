import { IsNotEmpty } from "class-validator";

export class DirectoryMailDto {
    @IsNotEmpty()
    username: string;
}