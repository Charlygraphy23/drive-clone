import AUDIO_ICON from '@app/assets/icons/audio.svg';
import AVI_ICON from '@app/assets/icons/avi.svg';
import CSS_ICON from '@app/assets/icons/css.svg';
import CSV_ICON from '@app/assets/icons/csv.svg';
import DOC_ICON from '@app/assets/icons/doc.svg';
import EXCEL_ICON from "@app/assets/icons/excel.svg";
import FONT_ICON from '@app/assets/icons/font.svg';
import GIF_ICON from '@app/assets/icons/gif.svg';
import HTML_ICON from '@app/assets/icons/html.svg';
import IMAGE_ICON from '@app/assets/icons/image.svg';
import JS_ICON from '@app/assets/icons/javascript.svg';
import JPEG_ICON from '@app/assets/icons/jpg.svg';
import JSON_ICON from '@app/assets/icons/json.svg';
import MP3_ICON from '@app/assets/icons/mp3.svg';
import MP4_ICON from '@app/assets/icons/mp4.svg';
import PDF_ICON from '@app/assets/icons/pdf.svg';
import PNG_ICON from '@app/assets/icons/png.svg';
import PPT_ICON from '@app/assets/icons/ppt.svg';
import RAR_ICON from '@app/assets/icons/rar.svg';
import SVG_ICON from '@app/assets/icons/svg.svg';
import TEXT_ICON from '@app/assets/icons/text.svg';
import VIDEO_ICON from '@app/assets/icons/video.svg';
import ZIP_ICON from '@app/assets/icons/zip.svg';


export const getFileIconByType = (mimeType: File["type"]) => {

    if (mimeType && mimeType?.startsWith("image")) {
        const type = mimeType?.split("/")?.[1]
        if (type === "jpeg") return JPEG_ICON
        if (type === "gif") return GIF_ICON
        if (type === "png") return PNG_ICON
        if (type === "svg") return SVG_ICON
        if (type === "svg") return SVG_ICON
        return IMAGE_ICON
    }


    if (mimeType && mimeType?.startsWith("video")) {
        const type = mimeType?.split("/")?.[1]
        if (type === "x-msvideo") return AVI_ICON
        if (type === "mp4") return MP4_ICON
        if (type === "mpeg") return MP4_ICON
        return VIDEO_ICON
    }

    if (mimeType && mimeType?.startsWith("audio")) {
        const type = mimeType?.split("/")?.[1]
        if (type === "mp3") return MP3_ICON
        return AUDIO_ICON
    }


    if (mimeType && mimeType?.startsWith("text")) {
        const type = mimeType?.split("/")?.[1]
        if (type === "css") return CSS_ICON
        if (type === "csv") return CSV_ICON
        if (type === "html") return HTML_ICON
        if (type === "javascript") return JS_ICON
        if (type === "plain") return TEXT_ICON
        return TEXT_ICON
    }


    if (mimeType && mimeType?.startsWith("application")) {
        const type = mimeType?.split("/")?.[1]
        if (type === "doc") return DOC_ICON
        if (type === "json") return JSON_ICON
        if (type === "pdf") return PDF_ICON
        if (type === "vnd.ms-powerpoint") return PPT_ICON
        if (type === "zip") return ZIP_ICON
        if (type === "vnd.rar") return RAR_ICON
        if (type === "vnd.ms-excel") return EXCEL_ICON
        if (type === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") return EXCEL_ICON
        return ZIP_ICON
    }

    if (mimeType && mimeType?.startsWith("font")) {
        return FONT_ICON
    }

    return ZIP_ICON
}