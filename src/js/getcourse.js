/**
 * @Author: Colin Osterhout, modified from sample provided by LeapFrog CourseLeaf
 * @Date:   2017-06-02T14:58:55-08:00
 * @Project: catalog
* @Last modified by:   ctosterhout
* @Last modified time: 2017-06-09T12:43:20-08:00
 */

function showCourse(domobj, which) {
    var urlProxy = 'http://uas.alaska.edu/cms/tests/catalog/getcourse.php';
    if (typeof coursebubblewidth == "undefined") {
        if (typeof bubblewidth == "undefined")
            var coursebubblewidth = 400;
        else
            var coursebubblewidth = bubblewidth;
    }

    function showCourseReady(req) {
        if ($(req).find("course").length) {
            var html = $(req).find("course").text();
        } else {
            var html = "<p>Course information cannot be found. This course may " +
                "no longer be offered. If you believe there is an error or " +
                "require more information, please contact the course " +
                "department.</p>";
        }
        lfjs.bubble(domobj, html, {
            width: coursebubblewidth
        });
    }

    function showCourseError(req) {
        var html = "<p>An error occurred trying to load course inormation. Please try your request again later.(" + req.status + " - " + req.statusText + ") < /p>";
        lfjs.bubble(domobj, html, {
            width: coursebubblewidth
        });
    }
    domobj.blur();
    var gcurl = urlProxy + "?code=" + encodeURIComponent(which);
    //if there is an archivepath var and an edition var defined, use that in the getCourse call
    if (typeof edition != "undefined" && typeof archivepath != "undefined") {
        gcurl += "&edition=" + encodeURIComponent(edition);
    }
    $.ajax({
        url: gcurl,
        success: showCourseReady,
        error: showCourseError
    });
    lfjs.bubble(domobj, "Loading course description...", {
        width: coursebubblewidth
    });
    return false;
}
