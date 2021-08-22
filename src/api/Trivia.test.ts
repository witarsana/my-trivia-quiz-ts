import * as Trivia from "./Trivia"
// @ponicode
describe("Trivia.getTrivias", () => {
    test("0", async () => {
        await Trivia.getTrivias({ difficulty: "0xe2d81098e6a4bf38eecdcb5684199b1a79ed943d", amount: 100 })
    })

    test("1", async () => {
        await Trivia.getTrivias({ difficulty: "0x8acec639cccfdbd9b1ac999c26f4ddab5e93effd", amount: 0 })
    })

    test("2", async () => {
        await Trivia.getTrivias({ difficulty: "0xabdc3aded6589b04eaffe2f9fc9cd4f94f59f90b", amount: 0 })
    })

    test("3", async () => {
        await Trivia.getTrivias({ difficulty: "0xabdc3aded6589b04eaffe2f9fc9cd4f94f59f90b", amount: -100 })
    })

    test("4", async () => {
        await Trivia.getTrivias({ difficulty: "0xeb8f8db6baafd1155f89a03bef4cb01029e6bbea", amount: 100 })
    })

    test("5", async () => {
        await Trivia.getTrivias({ difficulty: "", amount: Infinity })
    })
})
