var DATETIME_HEADER1 = 'ngày giao';
var DATETIME_HEADER2 = 'ngay giao';
var EDIT_TRIGGER1 = 'mã đơn hàng';
var EDIT_TRIGGER2 = 'ma don hang';
function formatDate() {
    
    var d = new Date();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    var gio=d.getHours();
    var phut=d.getMinutes();
    var giay=d.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    var str1= [day, month, year].join('/');
    var str2= [gio, phut, giay].join(':');
    return str1+" "+str2;
}
 
function onEdit(e) {  
 
  const row = e.range.getRow();
  const col = e.range.getColumn();
  const as = e.source.getActiveSheet();
  
  var arrFirstRow=as.getDataRange().getValues().shift();// lay ra dong dau tien;
  if(row<2){
    return;
  }

  var hieu_col=col-1;
  if(hieu_col>0){
    if(arrFirstRow.length>hieu_col){
      var header_title=arrFirstRow[hieu_col];// me
      header_title=header_title.toLowerCase();
      if(header_title==EDIT_TRIGGER1||header_title==EDIT_TRIGGER2){

          var LL=arrFirstRow.length;
          var idTim=200;
          var allLine="";
          for(var k=0;k<LL;k++){
            var strTMP=arrFirstRow[k];
            if(!isNaN(strTMP)){
              continue;
            }
            strTMP=strTMP.toLowerCase();
            allLine=allLine+","+strTMP;
            if(strTMP==DATETIME_HEADER1||strTMP==DATETIME_HEADER2){
              idTim=(k+1);
              break;
            }
          }

          if(idTim<20){
            var date_time=formatDate();
            as.getRange(row, idTim).setValue(date_time);//.setNumberFormat("dd/mm/yyyy hh:mm:ss");
            AutoFillAll(as,hieu_col,idTim-1,date_time,row-1);
            //as.getRange(row, 10).setValue(e.getValues()+"vldc");
          }else{
            //as.getRange(row, 10).setValue("Loi roi ko thim thay header:"+allLine);
          }
          
          //as.getRange(row, 1).setValue("xxxx")
      }else{
        //as.getRange(row, 9).setValue("error="+col+" "+header_title);
        //as.getRange(row, 10).setValue(JSON.stringify(arrFirstRow));
      }
    }else {
       // as.getRange(row, 9).setValue("error="+col+"");
    }
  }else{
    //as.getRange(row, 1).setValue("error=+");
  }
  
  
}

function AutoFillAll(as,id_mdh,id_thoigian,strlastDate,bat_dau) {
    var arrAll=as.getDataRange().getValues();
    if(arrAll.length<bat_dau){
      return;
    }
    if(bat_dau<1){
      bat_dau=1;
    }
    var MM=id_thoigian>id_mdh?id_thoigian:id_mdh;
    MM=MM-1;
    var last_time="";
    for(var tk=bat_dau;tk<arrAll.length;tk++){
       var arrDongT=arrAll[tk];

       var strMDH=arrDongT[id_mdh]+"";
       if(strMDH=="undefined"){
        continue;
       }
       if(strMDH.length<2){
        continue;
       }
       var strTG=arrDongT[id_thoigian]+"";
       var allowFill=false;
       if(strTG=="undefined"){
          allowFill=true;
       }
      if(strTG.length<2){
          allowFill=true;
        }
        if(allowFill){
          as.getRange((tk+1), (id_thoigian+1)).setValue(strlastDate);
        }
      
    }
}

















