/* Provides javascript bridge between WYMEditor and the django-cms PlaceholderEditor widget */

/*
 * The PlaceholderEditor widget allows different text editors to be used and
 * provides a javascript UI for inserting objects into the text editor.  For this
 * to work, the text editor needs to provide a javascript interface to talk to.
 * This is provided by PlaceholderBridge in this instance, but for different editors
 * a different bridge would be needed, with the same public interface.
 *
 * The PlaceholderEditor javascript needs to be able to find the javascript object
 * that provides this interface.  This is done by making a call to
 * PlaceholderEditorRegistry.registerEditor - see placeholder_editor_registry
 *
 * We also want to be able to re-use this bridge for different versions of
 * the WYMEditor, simply enabling it when the editor is created.
 */

function CKEditorPlaceholderBridge(wym) {
    this.wym = wym;
}

CKEditorPlaceholderBridge.prototype.insertText = function(text) {
	CKEDITOR.currentInstance.insertText(text);

};

CKEditorPlaceholderBridge.prototype.replaceContent = function(old, rep) {
    var content = tinyMCE.activeEditor.getContent()
    content = content.split(old).join(rep)
    tinyMCE.activeEditor.setContent(content)
};


CKEditorPlaceholderBridge.prototype.selectedObject = function() {
    return CKEDITOR.currentInstance.getSelection();
};

