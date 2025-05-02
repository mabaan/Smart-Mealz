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

    // Additional fix to prevent Arabic UI
    // if(typeof google !== 'undefined' && google.translate) {
    //     google.translate.TranslateService.prototype.getDetectedLanguage = function() {
    //       return 'en';
    //     };
    // }
}
