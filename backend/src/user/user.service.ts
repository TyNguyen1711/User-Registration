import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(email: string, password: string) {
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      return {
        success: false,
        message: 'Email này đã được đăng ký',
      };
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashed });
    user.save();
    return {
      success: true,
      message: 'Đăng ký thành công !',
      user,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return { success: false, message: 'Email này chưa được đăng ký' };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return { success: false, message: 'Mật khẩu không đúng' };

    return {
      success: true,
      message: 'Đăng nhập thành công',
      user: { id: user._id, email: user.email, createdAt: user.createdAt },
    };
  }
}
