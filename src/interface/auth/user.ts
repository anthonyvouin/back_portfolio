export interface UserProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin?: boolean;
  }

  

// Omit, je prend mon interface, puis je retire des champs
// Pick, je prend UserProps, puis je lui précise ensuite les champs que je souhaite avoir

  export interface UserWithoutPwdandAdmin extends Omit< UserProps, 'password'| 'isAdmin' > { }

  export interface UserCredential extends Pick< UserProps, 'email' | 'password' > { } 

  export interface UserPasswordOnly extends Pick < UserProps, 'password' > { }