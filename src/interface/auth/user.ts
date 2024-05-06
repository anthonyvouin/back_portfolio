export interface UserProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin?: boolean;
  }

  

// Je vire ce que je veux pas grace au omit
  export interface UserWithoutPwdandAdmin extends Omit< UserProps, 'password'| 'isAdmin' > { }

  export interface UserCredential extends Omit< UserProps, 'firstName'| 'lastName' | 'isAdmin' > { }

  export interface UserPasswordOnly extends Pick < UserProps, 'password' > { }