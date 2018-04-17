/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
    //config.uiColor = '#AADC6E';

    //config.width = '100%';

    //Add CSS to ensure Editor is scrollable on mobile
    //config.contentsCss = ['/css/ck-iframe.css', '/Editor/ck/contents.css']; //contents.css is default css for ckeditor
    //had trouble getting this to work. Added changes directly to contents.css. On update of ckeditor, ensure customizations
    //of contents.css are preserved.

    //Customize the ckeditor toolbar
    config.toolbar = [
                    { name: 'document', items: ['Source', '-', 'DocProps'] },
                    { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo'] },
                    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', '-', 'RemoveFormat'] },
                    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
                    { name: 'links', items: ['Link', 'Unlink'] },
                    { name: 'insert', items: ['Image', 'Video', 'Table', 'HorizontalRule', 'SpecialChar'] },
                    { name: 'styles', items: ['Format'] },
                    { name: 'colors', items: ['TextColor', 'BGColor'] },
                    { name: 'tools', items: ['Maximize'] },
                    //{ name: 'video', items: ['Video'] }
    ];
    // Task 5150 - Taking poster image from sharepoint
     config.videoposterimageurl = '/Style Library/Media Player/VideoPreview.png';
    //Task 4966 - removed setting of videodialog height and width
    config.extraPlugins = 'video';
    config.allowedContent = true;
};

