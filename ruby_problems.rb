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


def is_valid_sudoku(board)

  return false if board.length > 9

 inverted_board = board.transpose

  #get the board and it's transpose
  #iterate each row and return false if the count of a value is greater than 1
  #otherwise, return true

  #rows
  i = 0
  while i < board.length
    j = 0
    while j < board[i].length
        if board[i][j] != '.'
          if board[i].count(board[i][j]) > 1
            return false
          end
        end
      j += 1
    end
    i += 1
  end


  #columns
  k = 0
  while k < inverted_board.length
    l = 0
    while l < inverted_board[k].length
        if inverted_board[k][l] != '.'
          if inverted_board[k].count(inverted_board[k][l]) > 1
            return false
          end
        end
      l += 1
    end
    k += 1
  end

  top_left = board[0][0..2] + board[1][0..2] + board[2][0..2]
  top_middle = board[0][3..5] + board[1][3..5] + board[2][3..5]
  top_right = board[0][6..8] + board[1][6..8] + board[2][6..8]

  middle_left = board[3][0..2] + board[4][0..2] + board[5][0..2]
  middle = board[3][3..5] + board[4][3..5] + board[5][3..5]
  middle_right = board[3][6..8] + board[4][6..8] + board[5][6..8]

  bottom_left = board[6][0..2] + board[7][0..2] + board[8][0..2]
  bottom_middle = board[6][3..5] + board[7][3..5] + board[8][3..5]
  bottom_right = board[6][6..8] + board[7][6..8] + board[8][6..8]


  square_regions = [].push(top_left, top_middle, top_right, middle_left, middle, middle_right, bottom_left, bottom_middle, bottom_right)


  #square regions
  m = 0
  while m < square_regions.length
    n = 0
    while n < square_regions[m].length
        if square_regions[m][n] != '.'
          if square_regions[m].count(square_regions[m][n]) > 1
            return false
          end
        end
      n += 1
    end
    m += 1
  end

  true
end
