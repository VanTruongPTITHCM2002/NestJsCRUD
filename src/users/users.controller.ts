import { Body, Controller, Delete, Get, Param, Patch, Post, Query,
    ParseIntPipe, ValidationPipe
 } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {

    constructor(private readonly usersService:UsersService){

    }

    @Get() //Get /users
    findAll(@Query('role') role?:'INTERN'| 'ADMIN'){
        return this.usersService.findAll(role);
    }

    @Get(':id') // Get /users/:id
    findOne(@Param('id',ParseIntPipe) id:number){
        return this.usersService.findOne(id);
    }

    @Get('interns')
    findAllInterns(){
        return [];
    }

    @Post()
    createUser(@Body(ValidationPipe) user: CreateUserDto){
        return this.usersService.create(user);
    }

    @Patch(':id')
    UpdateUser(@Param('id',ParseIntPipe) id:number, @Body(ValidationPipe) userUpdate:UpdateUserDto){
        return this.usersService.update(id,userUpdate);
    }

    @Delete(':id')
    deleteUser(@Param('id',ParseIntPipe) id:number){
        return this.usersService.delete(id);
    }
}
