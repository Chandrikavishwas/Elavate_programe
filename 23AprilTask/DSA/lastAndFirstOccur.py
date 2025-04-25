class Solution(object):
    def searchRange(self, nums, target):
        k=[]
        for i in range(len(nums)):
            if nums[i]==target:
                k.append(i)
        if len(k)>2:
            return [k[0],k[-1]]
        elif len(k)==2:
            return k
        elif len(k)==1:
            return [k[0],k[0]]
        else:
            return [-1,-1]