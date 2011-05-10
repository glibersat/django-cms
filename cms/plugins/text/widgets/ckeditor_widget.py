from ckeditor.widgets import CKEditorWidget
from django.conf import settings
from django.utils.translation import get_language
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe
from os.path import join
from django.utils.encoding import smart_unicode
import tinymce.settings
from django.utils import simplejson
from django.template.defaultfilters import escape
from django.forms.widgets import flatatt
import cms.plugins.text.settings

class CKEditor(CKEditorWidget):
    def __init__(self, installed_plugins=None,  **kwargs):
        super(CKEditor, self).__init__(**kwargs)
        self.installed_plugins = installed_plugins
        
    def render_additions(self, name, value, attrs=None):
        language = get_language()
        context = {
            'name': name,
            'language': language,
            'CMS_MEDIA_URL': settings.CMS_MEDIA_URL,
            'installed_plugins': self.installed_plugins,
        }
        return mark_safe(render_to_string(
            'cms/plugins/widgets/ckeditor.html', context))
        
    def _media(self):
        media = super(CKEditor, self).media
        media.add_js([join(settings.CMS_MEDIA_URL, path) for path in (
                      'js/ckeditor.placeholdereditor.js',
                      'js/lib/ui.core.js',
                      'js/placeholder_editor_registry.js',
                      )])
        return media
    
    
    media = property(_media)
    
    
