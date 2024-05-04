import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
    private users = [{
        "id":1,
        "name": "Nguyen Van Truong",
        "email": "truongvan123@gmail.com",
        "role": "INTERN",
        },{
        "id":2,
        "name": "Le Gia Hao",
        "email": "haole2002@gmail.com",
        "role": "ADMIN"
        }]

    findAll(role?:'INTERN' | 'ADMIN'){
        if(role){
            const rolesCheck =  this.users.filter(user => user.role === role);
            if(rolesCheck.length === 0) throw new NotFoundException("User Role Not Found");
            return rolesCheck;
        }
        return this.users;
    }

    findOne(id:number){
        const user = this.users.find(user => user.id === id);
        if(!user) throw new NotFoundException('User Not Found');
        return user;
    }

    create(user:CreateUserDto){
        const userById = [...this.users].sort((a,b)=>b.id - a.id);
        const newUser = {
            id: userById[0].id + 1,
            ...user
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id:number, updateUser:UpdateUserDto){
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user,...updateUser}
            }
            return user;
        })    

        return this.findOne(id);
    }

    delete(id:number){
        const removeUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removeUser;
    }
}
