import fs from "fs";

class FileReader {
  /**
   * Get folder content
   * @param {String} path path of the folder to get content data
   */
  static getFolderContent = (path) => {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, items) => {
        if(err){
          reject(err);
        }else{
          resolve(items);
        }
      })
    })
  }
}

export default FileReader;