import { Body, Controller, Post } from '@nestjs/common';
import type { CreateUserApplication } from '../../applications/create-user/create-user.application';
import type { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
	constructor(private createUser: CreateUserApplication) {}

	@Post()
	create(@Body() input: CreateUserDto) {
		return this.createUser.execute({ email: input.email, name: input.name });
	}
}
