/**
 * Created by adm9360 on 11/12/2015.
 */


Template.footer.helpers(
{
    copyRightDate()
    {
        let now = new Date();
        return now.getFullYear();
    }
});