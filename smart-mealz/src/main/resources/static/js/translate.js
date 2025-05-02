function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        autoDisplay: 'false',
        layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        gaTrack: false,
        gaId: 'none',
        // Force English UI
        lang: 'en'
    }, 'google_translate_element');


}
