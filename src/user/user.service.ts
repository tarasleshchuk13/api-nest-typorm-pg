import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { JWT_SECRET } from '../config'
import { CreateUserDto } from './dto/CreateUserDto'
import { LoginUserDto } from './dto/login-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserResponseInterface } from './types/user-response.interface'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
    }
    
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const errorResponse = {
            errors: {}
        }
        
        const userByEmail = await this.userRepository.findOne({
            where: { email: createUserDto.email }
        })
        const userByUsername = await this.userRepository.findOne({
            where: { username: createUserDto.username }
        })
        
        if (userByEmail) {
            errorResponse.errors['email'] = 'has already been taken'
        }
        
        if (userByUsername) {
            errorResponse.errors['username'] = 'has already been taken'
        }
        
        if (userByEmail || userByUsername) {
            throw new HttpException(
                errorResponse,
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }
        
        const newUser = this.userRepository.create(createUserDto)
        
        return await this.userRepository.save(newUser)
    }
    
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const errorResponse = {
            errors: {
                'email or password': 'is invalid'
            }
        }
        
        const user = await this.userRepository.findOne({
            where: { email: loginUserDto.email },
            select: ['id', 'username', 'email', 'bio', 'image', 'password']
        })
        
        if (!user) {
            throw new HttpException(
                errorResponse,
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }
        
        const isPasswordCorrect = await compare(
            loginUserDto.password,
            user.password
        )
        
        if (!isPasswordCorrect) {
            throw new HttpException(
                errorResponse,
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }
        
        delete user.password
        
        return user
    }
    
    findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { id } })
    }
    
    async updateUser(
        userId: number,
        updateUserDto: UpdateUserDto
    ): Promise<UserEntity> {
        const user = { ...await this.findById(userId), ...updateUserDto }
        return await this.userRepository.save(user)
    }
    
    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, JWT_SECRET)
    }
    
    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
    
}