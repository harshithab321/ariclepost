const mongoose=require('mongoose');
const url="mongodb://0.0.0.0:27017/artical";






exports.connect = () => {
    mongoose.connect(url)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Error in connection!'));
};

