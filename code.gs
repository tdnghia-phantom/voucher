function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  // Bật CORS cho phép gọi từ web
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    var data = {};
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch(err) {
        // Not JSON
      }
    }

    var fullname = data.fullname || '';
    var phone = data.phone || '';
    var course = data.course || '';
    
    // Nếu không có dữ liệu cần thiết, trả về luôn
    if (!fullname && !phone) {
       return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: "Không nhận được trường fullname và phone.",
          receivedData: data
       })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Kết nối với Spreadsheet
    var ss = SpreadsheetApp.openById('1QLcos4yx44Lxg-aEARm2TGxkK9ffDyLNBcptU5_keYI');
    
    // --- 1. Lấy Zalo Link từ Camp-Land ---
    var landSheet = ss.getSheetByName('Camp-Land');
    var zaloLink = '';
    
    if (landSheet) {
      var landData = landSheet.getDataRange().getValues();
      for (var i = 1; i < landData.length; i++) {
        if (landData[i][1] === 'B1 Phú Thạnh') { 
          var groupZaloStr = landData[i][6] || '';
          var links = groupZaloStr.split('|');
          
          if (course === 'Elite Express') {
            zaloLink = links[0] ? links[0].trim() : '';
          } else {
            zaloLink = links.length > 1 ? links[1].trim() : (links[0] ? links[0].trim() : '');
          }
          break;
        }
      }
    }
    
    // --- 2. Thêm dữ liệu vào khóa Camp-Reg ---
    var campName = 'B1 Phú Thạnh';
    var regSheet = ss.getSheetByName('Camp-Reg');
    
    if (!regSheet) {
      throw new Error("Không tìm thấy sheet 'Camp-Reg'");
    }

    var lastRow = regSheet.getLastRow();
    var newId = 1;
    
    if (lastRow > 0) {
      if (lastRow === 1) { 
        newId = 1;
      } else {
        var lastId = regSheet.getRange(lastRow, 1).getValue();
        if (!isNaN(lastId) && lastId !== '') {
          newId = Number(lastId) + 1;
        } else {
          newId = lastRow; 
        }
      }
    }
    
    // Thời gian lúc đăng ký: dd-mm-yy hh:mm theo giờ VN
    var now = new Date();
    var timeString = Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "dd-MM-yy HH:mm");
    
    regSheet.appendRow([
      newId,
      campName,
      fullname,
      phone,
      course,
      timeString
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      redirectUrl: zaloLink
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}
