// TODO: refactor this into a saga
// TODO: tweak this so setting up upload is separate from actually uploading
// Also split it up so resume is doable

import * as Errors from 'app/utility/Errors';

export const upload = async (accessToken, name, content, completionHandler) => {
    // length
    let length = getByteLen(content);

    // setup the upload
    let response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Upload-Content-Type': 'text/csv',
            'X-Upload-Content-Length': length,
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "name": name,
            "mimeType": 'application/vnd.google-apps.spreadsheet'
        })
    });
    let status = await response.status;

    // error check
    if (status !== 200) {
        let json = await response.json();
        console.tron.log('Error, received status ' + status + ' body ' + JSON.stringify(json));
        if (status === 403 && json.error !== undefined && json.error.message === 'Insufficient Permission') {
            throw new Errors.PermissionsError('Insufficient Permission')
        } else {
            throw new Error('Did not receive 200 for setup upload');
        }
    }

    // actually upload the spreadsheet
    let location = response.headers.get('Location');
    response = await fetch(location, {
        method: 'PUT',
        headers: {
            'Content-Length' : length,
            'Content-Type' : 'text/csv'
        },
        body: content
    });
    status = await response.status;

    // error check
    if (status !== 200) {
        console.tron.log('Error, received status ' + status + ' response ' + response);
        throw new Error('Did not receive 200 for upload');
    }

    if (completionHandler !== undefined) {
        let json = await response.json();
        completionHandler(json.id);
    }
};

// from https://codereview.stackexchange.com/questions/37512/count-byte-length-of-string
const getByteLen = (normal_val) => {
    // Force string type
    normal_val = String(normal_val);

    var byteLen = 0;
    for (var i = 0; i < normal_val.length; i++) {
        var c = normal_val.charCodeAt(i);
        byteLen += c < (1 <<  7) ? 1 :
                   c < (1 << 11) ? 2 :
                   c < (1 << 16) ? 3 :
                   c < (1 << 21) ? 4 :
                   c < (1 << 26) ? 5 :
                   c < (1 << 31) ? 6 : Number.NaN;
    }
    return byteLen;
}
