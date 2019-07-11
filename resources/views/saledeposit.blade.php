<!DOCTYPE html>
<html>

<head>
  <title>csvインポート画面</title>

  <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

  <style>

  </style>
</head>

<body>
  <div class="container">
    <div class="content">

      <div class="title">saledeposits table 2/4</div>
    </div>

    <form role="form" method="post" action="saledeposit" enctype="multipart/form-data">
      {{ csrf_field() }}
      <input type="file" name="csv_file" id="csv_file">
      <div class="form-group">
        <button type="submit" class="">インポート</button>
      </div>
    </form>

  </div>
  </div>
</body>

</html>
