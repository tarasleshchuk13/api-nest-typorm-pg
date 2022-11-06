import { hash } from 'bcrypt'
import {
    BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import { ArticleEntity } from '../article/article.entity'

@Entity({ name: 'users' })
export class UserEntity {
    
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    email: string
    
    @Column()
    username: string
    
    @Column({ default: '' })
    bio: string
    
    @Column({ default: '' })
    image: string
    
    @Column({ select: false })
    password: string
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }
    
    @OneToMany(() => ArticleEntity, article => article.author)
    articles: ArticleEntity[]
    
    @ManyToMany(() => ArticleEntity, article => article.likedUsers)
    @JoinTable()
    favorites: ArticleEntity[]
    
    @ManyToMany(() => UserEntity, (user) => user.following)
    @JoinTable({
        name: 'followers_following',
        joinColumn: {
            name: 'follower_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'following_id',
            referencedColumnName: 'id'
        }
    })
    followers: UserEntity[]
    
    @ManyToMany(() => UserEntity, (user) => user.followers)
    following: UserEntity[]
    
}