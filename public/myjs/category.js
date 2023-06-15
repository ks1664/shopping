$(document).ready(function () {
  viewcategory("");
});

var temptable;

function add_category() {
  if ($("#addform").valid()) {
    let reqData = {
      name: $("#name").val(),
      description: $("#description").val(),
    };
    if ($("#parent_id").val() != "") {
      reqData.parent_id = parseInt($("#parent_id").val());
    }
    $.post(`${BASE_URL}categories`, reqData, function (res) {
      alert(res.msg);
      document.getElementById("addform").reset();
      viewcategory("");
    });
  }
}

function editcategory(obj) {
  $("#myModalforcategory").modal("show");
  document.getElementById("editcategoryid").value = obj.id;
  document.getElementById("editcategoryname").value = obj.name;
  document.getElementById("editcategorydescription").value = obj.description;
  document.getElementById("type").value = obj.parent_id;
}

// function update_category() {
//   if ($("#updateform").valid()) {
//     var controls = document.getElementById("updateform").elements;
//     var formdata = new FormData();
//     for (var i = 0; i < controls.length; i++) {
//       if (controls[i].type == "file") {
//         formdata.append(controls[i].name, controls[i].files[0]);
//       } else {
//         formdata.append(controls[i].name, controls[i].value);
//       }
//     }
//     var xml = new XMLHttpRequest();
//     xml.onreadystatechange = function () {
//       if (this.readyState == 4 && this.status == 200) {
//         viewcategory('');
//         $("#myModalforcategory").modal("hide");
//       }
//     };
//     xml.open("PUT", `${BASE_URL}categories`, true);
//     xml.send(formdata);
//   }
// }

function update_category() {
  if ($("#updateform").valid()) {
    let reqData = {
      id: $("#editcategoryid").val(),
      name: $("#editcategoryname").val(),
      description: $("#editcategorydescription").val(),
    };
    if ($("#type").val() != "") {
      reqData.parent_id = parseInt($("#type").val());
    }

    let catId = reqData.id;

    $.ajax({
      url: `${BASE_URL}categories/${catId}`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(reqData),
      success: function (result) {
        alert(result.msg);
        viewcategory("");
        document.getElementById("updateform").reset();
        $("#myModalforcategory").modal("hide");
      },
    });
    // var xml = new XMLHttpRequest();
    // xml.onreadystatechange = function () {
    //   if (this.readyState == 4 && this.status == 200) {
    //     alert(res.msg);
    //     viewcategory("");
    //     document.getElementById("updateform").reset();
    //     $("#myModalforcategory").modal("hide");
    //   }
    // };
    // xml.open("PUT", `${BASE_URL}categories/${catId}`, true);
    // xml.send(JSON.stringify(reqData));
  }
}

function deletecategory(id) {
  var cc = confirm("Are you sure to delete ?");
  if (cc) {
    var httpreg = new XMLHttpRequest();
    httpreg.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        viewcategory("");
      }
    };
    httpreg.open("DELETE", `${BASE_URL}categories/${id}`, true);
    httpreg.send();
  }
}

function viewcategory(parent_id) {
  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var ar = JSON.parse(this.response);
      var tab = "";
      var drop = `<option value="">Select category</option>`;
      var srno = 1;

      ar.payload.data.forEach((obj) => {
        drop += `<option value="${obj.id}">${obj.name}</option>`;

        tab += "<tr>";
        tab += "<td>" + srno + "</td>";
        tab += "<td>" + obj.name + "</td>";
        tab += "<td>" + obj.description + "</td>";
        tab += "<td>" + obj.slug + "</td>";
        tab +=
          "<td><i onclick='deletecategory(\"" +
          obj.id +
          "\")'" +
          "class='fa fa-trash text-danger' style='cursor: pointer;'></i></td>";
        tab +=
          "<td><i onclick='editcategory(" +
          JSON.stringify(obj) +
          ")'" +
          "class='fa fa-edit text-warning' style='cursor: pointer;'></i></td>";
        tab += "</tr>";
        srno++;
      });

      if (parent_id == "") {
        $(".categorydrop").html(drop);
      }

      document.getElementById("tableforcategory").innerHTML = tab;
      try {
        if (temptable != undefined) {
          temptable.destroy();
        }
        temptable = $("#mycategory").dataTable({
          bPaginate: false,
        });
      } catch (e) {}
    } else {
      document.getElementById("tableforcategory").innerHTML =
        "<span class='spinner-border'></span>";
    }
  };
  let url = `${BASE_URL}categories?category_id=${parent_id}`;
  xml.open("GET", url, true);
  xml.send();
}

function uploadImageAsPromise(imageFile) {
  return new Promise(function (resolve, reject) {
    var storageRef = firebase
      .storage()
      .ref("product_images_multiple/" + imageFile.name);

    //Upload file
    var task = storageRef.put(imageFile);

    //Update progress bar
    task.on(
      "state_changed",
      function progress(snapshot) {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //                uploader.value = percentage;
      },
      function error(err) {},
      function complete() {
        var downloadURL = task.snapshot.downloadURL;
        console.log(".." + downloadURL);
        multi_images_Array.push(downloadURL);

        var ans = "";

        if (size === multi_images_Array.length) {
          alert("All images Uploaded to Cloud");
          for (var j = 0; j < multi_images_Array.length; j++) {
            //                    alert(multi_images_Array[j]);
            ans +=
              "<img src = " +
              multi_images_Array[j] +
              " style='width:50px;height:50px'>";
            var s = multi_images_Array[j];
            tes.push({ s_id: j, s_im: s });
          }
          document.getElementById("multiple_images").innerHTML = ans;
        }
      }
    );
  });
}

function add_multiple_images() {
  var fc = document.getElementById("catImg");
  size = fc.files.length;

  for (var i = 0; i < fc.files.length; i++) {
    var file = fc.files[i];
    var objKey = file.name;
    uploadImageAsPromise(file);
  }
}
