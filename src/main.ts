import { HTTPRequest, Method } from "./request";
import $ from "jquery";

var input = $("#input");
var output = $("#output");

var httpRequest = null;

input.on("change keyup paste", () => {
    httpRequest = HTTPRequest.from(input.val() as string);
    output.val(httpRequest.build());
});
