module.exports = function(ng) {
  ng.controller('MainCtrl', function($scope, db) {
    db.info(function(err, info) {
      db.changes({
        since: info.update_seq,
        continuous: true,
        onChange: function() {
          list();
        }
      });
    });

    function list() {
      db.allDocs({ include_docs: true, limit: 20 }, function(err, res) {
        $scope.$apply(function() {
          $scope.docs = $scope.pluck(res.rows, 'doc');
        });
      });
    }
    // view should support {{}}
    $scope.post = function(doc) {
      doc.posted = new Date();
      db.post(doc, function(err, res) {
        doc.body = '';
        if (err) { return alert(err); }
        if (res.ok) {
          list();
        }
      })
    }

    // list docs
    list();

  });
}