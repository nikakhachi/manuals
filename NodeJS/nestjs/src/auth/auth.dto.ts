import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class ISignUpProps {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export { ISignUpProps };
