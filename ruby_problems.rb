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

def single_number(nums)

  hash = Hash.new(0)

  nums.each do |num|
    hash[num] += 1
  end

  hash.each do |k, v|
    return k if v == 1
  end


end


def str_str(haystack, needle)

  return 0 if haystack.empty? && needle.empty?

  haystack.split('').each_index do |i|
    return i if haystack[i...i + needle.length] === needle
  end

  -1
end
