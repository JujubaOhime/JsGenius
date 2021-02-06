
QUnit.test("capitalizeFirstLetter exists", function(assert){
    assert.ok(capitalizeFirstLetter, "capitalizeFirstLetter exists")
})

QUnit.test("capitalizeFirstLetter is a function", function(assert){
    assert.ok(typeof capitalizeFirstLetter === 'function', "capitalizeFirstLetter is a function")
})

QUnit.test("capitalizeFirstLetter exists", function(assert){
    let a = [["banana", "Banana"] ]
    assert.equal(capitalizeFirstLetter(a[0][0]), a[0][1], "Argument of " + a[0][0] + " returned " + a[0][1])
})
