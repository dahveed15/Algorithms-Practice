def remove_duplicates(nums)

  i = 0
  while i < nums.length - 1

   if nums[i] == nums[i + 1]
       nums.slice!(i)
   else
       i += 1
   end

  end


 nums.length

end
