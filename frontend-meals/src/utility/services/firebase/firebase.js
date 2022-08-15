import { storage } from "./firebase.utility";


export const post = async (image)=>{
    const uploadTask = storage.ref(`images/${image?.name}`).put(image);
    return Promise((resolve, reject)=>{
        uploadTask.on(
            "state_changed",
            (snap) => {},
            (error) => {
                return error
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(async (url) => {
                    resolve(url)
                });
            })
    });
    

      
}