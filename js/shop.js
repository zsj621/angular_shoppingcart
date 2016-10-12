var app = angular.module('appModule',[]);
app.controller('ctrl',function ($scope , $http) {
    $scope.dataInfos = {
        books: []
    };
    $scope.bookInfo = {
        name : '',
        price: '',
        page: '',
        count: ''
    };
    $scope.flag = 1;
    $http.get('js/book.json').success(function (data) {
        $scope.dataInfos = data;
    });
    //小计
    $scope.middleTotal = function (book) {
        return book.price*book.count;
    };
    //合计总价格
    $scope.total = function () {
        var sum = 0;
        angular.forEach($scope.dataInfos.books,function (item) {
            sum+= item.count*item.price;
        });
        return sum;
    };
    $scope.addbook = function () {
        $scope.flag = 1;
        $('#add_book_modal').modal();
    };

    //点击‘新增’modal框中‘确定’增加一项书籍
    $scope.addBook = function () {
        $scope.dataInfos.books.push($scope.bookInfo);
        $scope.bookInfo = {
            name : '',
            price: '',
            page: '',
            count: ''
        };
        $('#add_book_modal').modal('hide');
    };
    //修改书籍信息
    $scope.modifyBook = function (obj) {
        $scope.flag = 0;
        $scope.bookInfo = {
            name : obj.name,
            price: obj.price,
            page: obj.page,
            count: obj.count
        }
    };
    $scope.modifyBookInfo = function () {
        $('#add_book_modal').modal('hide');
        $scope.bookInfo = {
            name : '',
            price: '',
            page: '',
            count: ''
        };

    };
    $scope.$watch($scope.total,function (newVal, oldVal) {
        $scope.dataInfos.post = newVal>=200?0:20;
    });
    $scope.filterPrice = function (obj) {
        return $scope.priceData ? obj.price < $scope.priceData:obj;
    }
});
