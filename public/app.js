document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore();
    const post = db.collection('posts').doc('MKJScYYllI7d7AINIjoM');

    post.get().then(doc => {
        const data = doc.data();
        document.write( data.title + `<br>`);
    });
    
});

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        document.write(`Hello ${user.displayName}`);
        console.log(user);
    })
}