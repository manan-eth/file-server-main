var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var LogoutBtn = document.querySelector('.logout');
var postBtn = document.querySelector('.add');
var closeBtn = document.querySelector('.close');
var icons = document.querySelectorAll('.icon');
var initialDisplay = document.querySelector('.init');
var postFormSection = document.querySelector('.add-sec');
var fileInput = document.querySelector('#file');
var postFileBtn = document.querySelector('.post');
var mainSection = document.querySelector('.main');
var infoString = localStorage.getItem('profile');
var info;
if (infoString) {
    info = JSON.parse(infoString);
    var user = info.user;
    if (user.user.role == "user") {
        postBtn.classList.add('hide');
    }
}
LogoutBtn.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                return [4 /*yield*/, logoutFunc()];
            case 1:
                data = _a.sent();
                if (data.success) {
                    localStorage.removeItem('profile');
                    window.location.href = 'http://127.0.0.1:5500/client/index.html';
                }
                else {
                    console.log('error');
                }
                return [2 /*return*/];
        }
    });
}); });
icons.forEach(function (icon) {
    icon.addEventListener('click', function () {
        fileInput.click();
    });
});
closeBtn.addEventListener('click', function () {
    initialDisplay === null || initialDisplay === void 0 ? void 0 : initialDisplay.classList.remove('opacity');
    postFormSection === null || postFormSection === void 0 ? void 0 : postFormSection.classList.add('hide');
    initialDisplay === null || initialDisplay === void 0 ? void 0 : initialDisplay.classList.remove('fade');
    mainSection.classList.remove('fade');
    mainSection.classList.remove('accessibility');
});
postBtn.addEventListener('click', function () {
    initialDisplay === null || initialDisplay === void 0 ? void 0 : initialDisplay.classList.add('fade');
    mainSection.classList.add('fade');
    postFormSection === null || postFormSection === void 0 ? void 0 : postFormSection.classList.remove('hide');
    mainSection.classList.add('accessibility');
});
postFileBtn.addEventListener('click', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var form, desc, formData, info, id, user, data, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                form = document.querySelector('#file-form');
                desc = document.querySelector('#desc');
                formData = new FormData(form);
                if (fileInput.files && fileInput.files[0]) {
                    formData.set('file', fileInput.files[0]);
                }
                if (infoString) {
                    info = JSON.parse(infoString);
                    user = info.user;
                    id = user.user.id;
                }
                formData.append('id', id);
                formData.append('desc', desc.value);
                return [4 /*yield*/, postFunc(formData)];
            case 1:
                data = _a.sent();
                if (!data.success) return [3 /*break*/, 3];
                return [4 /*yield*/, getFile(data.id)];
            case 2:
                file = _a.sent();
                console.log(file);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
var postFunc = function (formData) { return __awaiter(_this, void 0, void 0, function () {
    var info, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (infoString) {
                    info = JSON.parse(infoString);
                }
                return [4 /*yield*/, fetch('http://localhost:3000/api/files/upload', {
                        method: 'POST',
                        headers: {
                            Authorization: "Bearer ".concat(info === null || info === void 0 ? void 0 : info.token)
                        },
                        body: formData
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
var getFile = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var info, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (infoString) {
                    info = JSON.parse(infoString);
                }
                return [4 /*yield*/, fetch("http://localhost:3000/api/files/".concat(id), {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: "Bearer ".concat(info === null || info === void 0 ? void 0 : info.token)
                        }
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                if (data.success) {
                    return [2 /*return*/, data.file];
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * Get All Files Function
 * @returns all files in Json Format
 */
var getAllFiles = function () { return __awaiter(_this, void 0, void 0, function () {
    var info, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (infoString) {
                    info = JSON.parse(infoString);
                }
                return [4 /*yield*/, fetch('http://localhost:3000/api/files', {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: "Bearer ".concat(info === null || info === void 0 ? void 0 : info.token)
                        }
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
function getFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllFiles()];
                case 1:
                    files = _a.sent();
                    console.log(files.files);
                    if (files) {
                        mainSection.classList.remove('hide');
                        mainSection.innerHTML = fileDisplay(files.files);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
getFiles();
var logoutFunc = function () { return __awaiter(_this, void 0, void 0, function () {
    var infoString, info, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                infoString = localStorage.getItem('profile');
                if (infoString) {
                    info = JSON.parse(infoString);
                }
                return [4 /*yield*/, fetch('http://localhost:3000/auth/logout', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': "Bearer ".concat(info === null || info === void 0 ? void 0 : info.token)
                        }
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
            case 3: return [4 /*yield*/, response.text()];
            case 4:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
fileInput.addEventListener("change", function (e) {
    e.preventDefault();
    if (fileInput.files) {
        var file_1 = fileInput.files[0];
        console.log(file_1);
        var reader_1 = new FileReader();
        reader_1.addEventListener("load", function () {
            var dataUrl = reader_1.result;
            if (file_1.type.startsWith('image/')) {
                var previewElement = document.querySelector('.image');
                var previewDiv = document.querySelector('.preview');
                previewDiv.classList.add('size');
                previewElement.classList.remove('hide');
                previewElement.src = dataUrl;
            }
            else if (file_1.type.startsWith('video/')) {
                var previewDiv = document.querySelector('.preview');
                previewDiv.classList.add('size');
                var previewElement = document.querySelector('.video');
                previewElement.classList.remove('hide');
                previewElement.src = dataUrl;
                previewElement.play();
            }
            else if (file_1.type === "application/pdf") {
                var previewDiv = document.querySelector('.preview');
                previewDiv.classList.add('size');
                var previewElement = document.querySelector('#pdfPreview');
                previewElement.classList.remove('hide');
                previewElement.src = dataUrl;
            }
        });
        // Read the contents of the selected file as a data URL
        reader_1.readAsDataURL(file_1);
    }
});
function fileDisplay(files) {
    if (!Array.isArray(files)) {
        return ''; // Return an empty string or handle the error appropriately
    }
    var fileElements = files.map(function (file) {
        var fileContent = '';
        var filename = file.name;
        var nameWithoutExtension = filename.split("-")[1].split(".")[0];
        if (file.mimetype.startsWith('image/')) {
            fileContent = "<img width='100%' height='100%' src=\"".concat(file.url, "\" alt=\"").concat(file.name, "\">");
        }
        else if (file.mimetype === 'application/pdf') {
            fileContent = "<iframe width='100%' height='100%' src=\"".concat(file.url, "\" frameborder=\"0\"></iframe>");
        }
        else if (file.mimetype.startsWith('video/')) {
            fileContent = "<video width='100%' height='100%' src=\"".concat(file.url, "\"></video>");
        }
        return "\n      <div class=\"card\">\n        <div class=\"file-container\">\n          ".concat(fileContent, "\n        </div>\n        <div class=\"about\">\n          <h4>").concat(nameWithoutExtension, "</h4>\n          <p>").concat(file.description, "</p>\n        </div>\n        <div class=\"utility\">\n          <div class=\"send-container\">\n            <div class=\"send\">\n              <label for=\"email\">\n                <input type=\"email\" name=\"email\" id=\"email\" placeholder=\"email of the recipient\">\n              </label>\n              <i class=\"fas fa-paper-plane\"></i>\n            </div>\n            <p>Number of times sent: ").concat(file.no_of_sent, "</p>\n          </div>\n          <div class=\"download-container\">\n            <button class=\"download ").concat(file.id, "\" type=\"button\">\n              <i class=\"fas fa-download\"></i>\n              <p>download</p>\n            </button>\n            <p>Number of downloads: ").concat(file.no_of_downloads, "</p>\n          </div>\n        </div>\n      </div>\n      ");
    }).join('');
    return fileElements;
}
