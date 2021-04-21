 /**
  * Model of a user of the App
  */
 export interface UserModel {
   /**
    * Email of the user. It must be unique
    */
    email: string,
    /**
     * Password of the user
     */
    password: string,
    /**
     * Name of the user shown at Home
     */
    name: string,
    /**
     * Surname of the user shown at Home
     */
    surname: string;
    /**
     * Last time the user accessed to the App. The first time is null
     */
    lastTime?: number;
  }