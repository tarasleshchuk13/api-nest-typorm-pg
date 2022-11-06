import {
    Body, Controller, Get, Post, Put, UseGuards, UsePipes,
} from '@nestjs/common'
import { BackendValidationPipe } from '../shared/pipes/backend-validation.pipe'
import { User } from './decorators/user.decorator'
import { CreateUserDto } from './dto/CreateUserDto'
import { LoginUserDto } from './dto/login-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from './guards/auth.guard'
import { UserResponseInterface } from './types/user-response.interface'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@Controller()
export class UserController {
    
    constructor(private readonly userService: UserService) {
    }
    
    @Post('users')
    @UsePipes(new BackendValidationPipe())
    async createUser(
        @Body('user') createUserDto: CreateUserDto
    ): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto)
        
        return this.userService.buildUserResponse(user)
    }
    
    @Post('users/login')
    @UsePipes(new BackendValidationPipe())
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto)
        
        return this.userService.buildUserResponse(user)
    }
    
    @Get('users')
    @UseGuards(AuthGuard)
    async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
        return this.userService.buildUserResponse(user)
    }
    
    @Put('users')
    @UseGuards(AuthGuard)
    async updateCurrentUser(
        @User('id') currentUserId: number,
        @Body('user') updateUserDto: UpdateUserDto
    ): Promise<UserResponseInterface> {
        const user = await this.userService.updateUser(
            currentUserId,
            updateUserDto
        )
        
        return this.userService.buildUserResponse(user)
    }
    
}