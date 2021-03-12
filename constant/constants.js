module.exports = {
    ACCESS_TOKEN: 'access_token',
    AUTHORIZATION: 'Authorization',
    REFRESH_TOKEN: 'refresh_token',
    DOC: 'Document',
    IMG: 'Image',
    DOCS_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    IMG_MAX_SIZE: 2 * 1024 * 1024, // 2MB
    DOCS_MIMETYPES: [
        'application/msword', // .doc
        'application/pdf', // .pdf
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xls
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .doc 2007
        'text/plain' // .txt
    ],
    IMG_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ]
};
