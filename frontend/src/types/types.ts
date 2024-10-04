export type SignUpForm = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "";
};

export interface AuthUser {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
}
