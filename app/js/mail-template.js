(function() {
    class MailTemplate {
        getMailTemplate(mailData) {
            const {} = mailData;
        }
    }

    const mailTemplateInstance = new MailTemplate();
    window.mailTemplateModule = {
        instance: mailTemplateInstance
    };
})();