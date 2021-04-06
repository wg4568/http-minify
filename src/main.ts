import { HTTPRequest, fixHeader } from "./request";
import $ from "jquery";

var input = $("#_input");
var output = $("#_output");
var httpRequest: HTTPRequest;
var headerItems: string[] = [];
var headerInput = $("#_header_input");

$(() => {
    update();

    $("#_header_input").on("keypress", (e) => {
        if (e.key == "Enter") make_header_item();
    });

    $("#_add_to_headers").on("click", () => {
        make_header_item();
    });

    $("#_allow_list").on("change", () => {
        update();
    });

    $("#_deny_list").on("change", () => {
        update();
    });

    input.on("change keyup paste", () => {
        update();
    });
});

function get_list_mode(): "allow" | "deny" {
    if ($("#_allow_list:checked").val()) return "allow";
    return "deny";
}

function make_header_item() {
    console.log(headerInput);
    var fixed = fixHeader(headerInput.val() as string);
    if (headerItems.indexOf(fixed) == -1 && fixed != "") {
        var html = `
            <li id="_hli_${fixed}" class="list-group-item d-flex justify-content-between align-items-center header-item">
                ${fixed}
                <button class="btn btn-danger badge badge-danger" id="_hrm_${fixed}">remove</button>
            </li>`;

        headerItems.push(fixed);
        $("#_header_items").append(html);
        $(`#_hrm_${fixed}`).on("click", () => {
            var idx = headerItems.indexOf(fixed);
            if (idx != -1) delete headerItems[idx];
            $(`#_hli_${fixed}`).remove();
            update();
        });

        headerInput.val("");
        update();
    }
}

function update() {
    let data = input.val() as string;
    httpRequest = HTTPRequest.from(data);
    $("#_method").text(httpRequest.method || "<missing>");
    $("#_resource").text(httpRequest.resource || "<missing>");
    $("#_version").text(httpRequest.version || "<missing>");

    $("#_headers").empty();
    $("#_body").empty();

    httpRequest.getHeaders().forEach((value, header) => {
        $("#_headers").append(
            `<span class="mx-3 data">${header}: ${value}</span><br/>`
        );
    });

    httpRequest
        .getBody()
        .split("\n")
        .forEach((value) => {
            let line = `<span class="mx-3 data">${value}</span><br/>`;
            $("#_body").append(line);
        });

    if (get_list_mode() == "allow") {
        httpRequest.allowlist(...headerItems);
    } else {
        httpRequest.denylist(...headerItems);
    }

    if (data != "") output.val(httpRequest.build());
    else output.val("");
}
