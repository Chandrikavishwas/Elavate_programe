class Solution(object):
    def sortedSquares(self, nums):
        arr=[]
        for i in nums:
            sqr=i*i
            arr.append(sqr)
        return sorted(arr)

        